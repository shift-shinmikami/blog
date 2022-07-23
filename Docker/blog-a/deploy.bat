@echo off
echo deploy bat called...
call gatsby build
cd ../../
call git add .
call git commit -m "deploy %date% %time%"
call git push
