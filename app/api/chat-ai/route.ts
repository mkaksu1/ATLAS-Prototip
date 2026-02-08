import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    
    const token = process.env.GITHUB_TOKEN;
    
    if (!token) {
      return NextResponse.json(
        { error: 'GitHub token yapılandırılmamış.' },
        { status: 500 }
      );
    }

    // gpt-4o: Daha kaliteli cevaplar, 1000 token limiti ile hızlı
    const response = await fetch('https://models.github.ai/inference/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'Sen ATLAS AI, kullanıcıların iş ve günlük hayatlarında yardımcı olan akıllı bir asistansın. Kısa, öz ve yardımcı cevaplar ver.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1000, // Hızlı cevap için düşük token limiti
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub Models API Error:', errorText);
      return NextResponse.json(
        { error: `API hatası: ${response.status}` },
        { status: response.status }
      );
    }

    // Stream response
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            controller.enqueue(value);
          }
        } catch (error) {
          console.error('Stream error:', error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
    
  } catch (error) {
    console.error('Chat AI API error:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
