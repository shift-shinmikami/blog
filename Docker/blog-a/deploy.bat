@echo off
echo deploy bat called...
call gatsby clean
call gatsby build
call git add .
call git commit -m "deploy %date% %time%"
call git push
