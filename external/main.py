from fastapi import FastAPI, HTTPException
from fastapi import WebSocket
from fastapi.responses import JSONResponse, FileResponse, RedirectResponse
import os

import asyncio
import json
import math
import random
import requests

app = FastAPI()


@app.websocket("/ws/data/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    while True:
        data_obj = {"list": [], "color": f"#{random.randint(0, 0xFFFFFF):06x}"}

        # 生成包含value的list
        for _ in range(10):
            data = {"value": math.floor(random.uniform(0, 100))}
            data_obj["list"].append(data)

        # 生成a-z的随机数值对应关系
        for char in range(97, 123):  # ASCII values for a-z
            data_obj[chr(char)] = random.randint(0, 100)

        await websocket.send_text(json.dumps(data_obj))
        await asyncio.sleep(1 / 100)


app_url = "https://cdn.golia.jp/electron-tora/downloads"
json_url = "https://data.golia.jp/electron-tora"


@app.get("/update/{platform}/{arch}/{version}")
async def check_for_updates(platform: str, version: str, arch: str):
    response = requests.get(f"{json_url}{platform}_version.json")

    print(response)
    if response.status_code == 200:
        latest_version = response.json()[f"{platform}_version"]

        print(latest_version, 'last')

        # 检查客户端版本是否低于服务器的最新版本
        if version < latest_version:
            return {
                "url": f"{app_url}/electron-tora-{platform}-{latest_version}-{arch}.zip",
                "name": latest_version,
            }
        else:
            # 如果不需要更新，通过状态码 204 表明没有内容响应
            raise HTTPException(status_code=204)
    else:
        # 如果不需要更新，通过状态码 204 表明没有内容响应
        raise HTTPException(status_code=204)


@app.get("/update/{platform}/{arch}/{version}/RELEASES")
async def get_releases(platform: str, version: str, arch: str):
    # 如果arch == 'x64'，则文件夹地址是 squirrel-windows 如果是arm，则是 squirrel-windows-arm64
    if arch == 'x64':
        s3_url = f"{app_url}/squirrel-windows/RELEASES"
    else:
        s3_url = f"{app_url}/squirrel-windows-arm64/RELEASES"
    return RedirectResponse(url=s3_url)


@app.get("/update/{platform}/{arch}/{version}/{filename:path}")
async def get_nupkg_file(platform: str, version: str, arch: str, filename: str):
    # 如果arch == 'x64'，则文件夹地址是 squirrel-windows 如果是arm，则是 squirrel-windows-arm64
    if filename.endswith('.nupkg'):
        if arch == 'x64':
            s3_url = f"{app_url}/squirrel-windows/{filename}"
        else:
            s3_url = f"{app_url}/squirrel-windows-arm64/{filename}"
        return RedirectResponse(url=s3_url)
    else:
        raise HTTPException(status_code=400, detail="Invalid file type")
