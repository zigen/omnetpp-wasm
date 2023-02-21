#!/bin/sh
set -eux
cd omnetpp
git add .
git stash
patches_dir="../patches"
patches=$(find $patches_dir -type f -name '*.patch' | sort)

for patch_file in $patches;
do
    echo "$patch_file"
    git apply "$patch_file"
done
cd -