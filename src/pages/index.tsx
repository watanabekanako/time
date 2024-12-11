import { useEffect, useState } from "react";
import dayjs from "dayjs";

export async function getServerSideProps() {
  // サーバー側で現在の時間を取得
  const serverTime = dayjs().toISOString();

  return {
    props: { serverTime },
  };
}

export default function Home({ serverTime }: any) {
  const [clientTime, setClientTime] = useState("");

  useEffect(() => {
    // クライアント側の現在の時間を取得
    setClientTime(dayjs().toISOString());
  }, []);

  // 時間差を計算 (ミリ秒単位)
  const timeDifference = clientTime
    ? dayjs(clientTime).diff(dayjs(serverTime))
    : null;

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1>SSR Time Test with Day.js</h1>
      <p>
        <strong>Server Time:</strong>{" "}
        {dayjs(serverTime).format("YYYY-MM-DD HH:mm:ss")}
      </p>
      <p>
        <strong>Client Time:</strong>{" "}
        {clientTime && dayjs(clientTime).format("YYYY-MM-DD HH:mm:ss")}
      </p>
      <p>
        <strong>Time Difference:</strong>{" "}
        {timeDifference !== null ? `${timeDifference} ms` : "Calculating..."}
      </p>
    </div>
  );
}
