"use client";

import { QRCodeSVG } from "qrcode.react";
import React from "react";

interface IProps {
  size?: number;
  value?: string;
  imageUrl?: string;
}

export default function QrCode({
  imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Lark_Suite_logo_2022.png/480px-Lark_Suite_logo_2022.png",
  size = 256,
  value = "https://reactjs.org/",
}: IProps) {
  return (
    <QRCodeSVG
      size={size}
      value={value}
      imageSettings={{
        src: imageUrl,
        x: undefined,
        y: undefined,
        height: 50,
        width: 50,
        opacity: 1,
        excavate: true,
      }}
    />
  );
}
