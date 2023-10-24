#!/usr/bin/env bash
set -ex
for i in `ls /payloads/*|sort`
do
[ -x "$i" ] && {
    "$i"
}
done