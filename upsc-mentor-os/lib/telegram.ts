export async function sendTelegramMessage(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_OWNER_ID;

  if (!token || !chatId) {
    throw new Error("Telegram environment variables are missing.");
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send Telegram message.");
  }

  return response.json();
}

export async function getTelegramFile(fileId: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    throw new Error("Telegram bot token is missing.");
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`
  );

  const data = await response.json();

  if (!data.ok) {
    throw new Error("Failed to get Telegram file.");
  }

  return data.result;
}

export async function downloadTelegramFile(filePath: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    throw new Error("Telegram bot token is missing.");
  }

  const response = await fetch(
    `https://api.telegram.org/file/bot${token}/${filePath}`
  );

  if (!response.ok) {
    throw new Error("Failed to download Telegram file.");
  }

  return response.arrayBuffer();
}