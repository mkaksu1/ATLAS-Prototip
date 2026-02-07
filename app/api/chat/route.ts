import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    
    const token = process.env.GITHUB_TOKEN;
    
    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token yapılandırılmamış. Lütfen .env.local dosyasına GITHUB_TOKEN ekleyin.' },
        { status: 500 }
      );
    }

    const response = await fetch('https://models.github.ai/inference/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub Models API Error:', errorText);
      return NextResponse.json(
        { error: `API hatası: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
