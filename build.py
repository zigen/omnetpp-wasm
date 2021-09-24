import toml
import argparse
import os
import subprocess
from glob import glob
import shutil
import re


def parse_config():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-f",
        "--config-file",
        metavar="file",
        type=str,
        help="build config toml file path",
    )

    args = parser.parse_args()
    print(args.config_file)

    with open(args.config_file, "rt") as f:
        config = toml.loads(f.read())["omnetpp-wasm-build"]

    proj_path = os.path.join(os.getcwd(), config["project-folder"])
    os.chdir(proj_path)

    config["ned-files"] = list(
        sum(
            map(
                lambda folder: glob(f"{folder}/**/*.ned", recursive=True),
                config.get("ned-folders", "."),
            ),
            [],
        )
    )
    print(config)
    return config


def gen_post_js(config):
    def wrap_with_double_quote(args):
        s = ""
        for arg in args:
            s += f'"{arg}",'
        return s

    config_args = ["-c", config["config_name"]] if "config_name" in config else []
    ned_folders = ["-n", ":".join(config.get("ned-folders", ["."]))]
    opp_env = config.get("ui", "Qtenv")
    ini_file = ["-f", config["ini-file"]]
    code = f"""
		arguments_ = [{wrap_with_double_quote(["-m", "-u", opp_env] + config_args + ned_folders + ini_file)}];
	"""
    print(code)
    with open("post.js", "w") as f:
        f.write(code)
    return code


def mkdir(dir):
    if not os.path.exists(dir):
        os.makedirs(dir)


def copy_artifacts(files, dest_dir):
    for file in files:
        shutil.copyfile(
            os.path.join("out/emcc-release/", file), os.path.join(dest_dir, file)
        )

def copy_qt_res(source, target, output_folder):
    global QT_RESOURCE_DIR
    dest_dir = os.path.join(output_folder, target)
    shutil.copyfile(os.path.join(QT_RESOURCE_DIR, source), dest_dir)

def copy_and_replace_qt_res(source, target, output_folder):
    dest_dir = os.path.join(output_folder, target)
    copy_qt_res(source, target, output_folder)
    with open(dest_dir, "r") as f:
        body = f.read()

    body = re.sub("@APPNAME@", "target", body)
    with open(dest_dir, "w") as f:
        f.write(body)


config = parse_config()

QT_RESOURCE_DIR = "/root/qtbase/qtbase/plugins/platforms/"
LIBS = "--post-js post.js -L/root/omnetpp/lib -Wl,--whole-archive -loppmain -L/root/qtbase/qtbase/lib -L/root/qtbase/qtbase/plugins/platforms -L/root/qtbase/qtbase/plugins/imageformats/ -lqwasm -lQt5Gui -lQt5Core -lQt5Widgets -lQt5PrintSupport -lQt5OpenGL -lQt5EventDispatcherSupport -lQt5FontDatabaseSupport -lqtfreetype -lqgif  -lqtpcre2 -lqtlibpng -lqtharfbuzz -lqjpeg -lqico -loppqtenv -loppenvir -lopplayout  -loppsim -loppnedxml -loppcommon  -lstdc++".split()
COPTS = "-O3 -Os -g0".split()
WASM_OPTS = '--bind -s ASYNCIFY=1 -s USE_PTHREADS=0 -s PTHREAD_POOL_SIZE=1 -s TOTAL_MEMORY=1GB -s WASM=1 -s FULL_ES2=1 -s USE_WEBGL2=1 -s NO_EXIT_RUNTIME=0  -s EXPORTED_RUNTIME_METHODS=["UTF16ToString","stringToUTF16","ccall","cwrap"] -s DISABLE_EXCEPTION_CATCHING=0'.split()
EMCC = "/emsdk/upstream/emscripten/em++"
OUT = ["-o", "out/emcc-release/target.html"]


files = []

for file in config["ned-files"] + [
    "/root/omnetpp/images@images",
    "/root/wasm-qtenvrc@.qtenvrc",
    config["ini-file"],
]:
    files.append("--preload-file")
    files.append(file)

gen_post_js(config)
subprocess.run(["opp_makemake", "-f", "-M", "release", "--deep", "-i", "./makefrag"])
subprocess.run(["emmake", "make"])
OBJS = ["-Wl,--whole-archive"] + glob("out/emcc-release/**/*.o", recursive=True)
print("OBJS: ", OBJS)
print([EMCC] + OUT + OBJS + LIBS + WASM_OPTS + files)
subprocess.run([EMCC] + OUT + OBJS + LIBS + WASM_OPTS + files)

output_folder = config["output-folder"]
mkdir(output_folder)
copy_artifacts(["target.wasm", "target.js", "target.data"], output_folder)
copy_and_replace_qt_res("wasm_shell.html", "index.html", output_folder)
copy_and_replace_qt_res("qtloader.js", "qtloader.js", output_folder)
copy_qt_res("qtlogo.svg", "qtlogo.svg", output_folder)
