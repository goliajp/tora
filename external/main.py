from fastapi import FastAPI
from fastapi import WebSocket

import asyncio
import json
import math
import random

app = FastAPI()


@app.websocket("/ws/data/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    while True:
        data_list = []
        for _ in range(100):
            data = {
                "value": math.floor(random.uniform(0, 100)),
                "height": random.uniform(0, 100),
                "color": f"#{random.randint(0, 0xFFFFFF):06x}",
            }
            data_list.append(data)

        await websocket.send_text(json.dumps(data_list))
        await asyncio.sleep(1 / 120)
