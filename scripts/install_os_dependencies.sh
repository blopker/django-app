#!/bin/bash

platform='unknown'
unamestr=`uname`

if [[ "$unamestr" == 'Linux' ]]; then
  platform='linux'
  OS_REQUIREMENTS_FILENAME="requirements.rpm"
elif [[ "$unamestr" == 'Darwin' ]]; then
  platform='osx'
  OS_REQUIREMENTS_FILENAME="requirements.osx"
fi

# Read the requirements.apt file, and remove comments and blank lines
function list_packages(){
  grep -v "#" ${OS_REQUIREMENTS_FILENAME} | grep -v "^$";
}

function install_linux()
{
  list_packages | xargs yum install -y;
  yum clean
}

function install_osx()
{
  list_packages | xargs brew install;
}

if [[ $platform == 'linux' ]]; then
  install_linux
elif [[ $platform == 'osx' ]]; then
   install_osx
fi
