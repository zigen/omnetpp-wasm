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


config = parse_config()

COPTS = "-O3 -Os -s ASSERTIONS=2 -s SAFE_HEAP=1".split()
WASM_OPTS = '--bind -s ASYNCIFY=1 -s USE_PTHREADS=0 -s PTHREAD_POOL_SIZE=1 -s TOTAL_MEMORY=1GB -s WASM=1 -s FULL_ES2=1 -s USE_WEBGL2=1 -s NO_EXIT_RUNTIME=0 -s EXPORTED_RUNTIME_METHODS=["UTF16ToString","stringToUTF16","ccall","cwrap"] -s DISABLE_EXCEPTION_CATCHING=0 --post-js post.js'.split()

files = []

for file in config["ned-files"] + [
    "/root/omnetpp/images@images",
    "/root/wasm-qtenvrc@.qtenvrc",
    config["ini-file"],
]:
    files.append("--preload-file")
    files.append(file)
files_str = " ".join(files)
gen_post_js(config)
subprocess.run(["opp_makemake", "-f", "-M", "release", "--deep", "-i", "./makefrag"])
subprocess.run(["emmake", "make", "index.html", f'PRELOAD_FILES={files_str}'])
