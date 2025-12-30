import { NextResponse } from "next/server";

const CONTRACT_ADDRESS = "Gd5iJqmFR6AncQHMofBzxvSDmhdutbCSS3f7rLFupump";

export async function GET() {
  try {
    // Fetch from DexScreener API
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`,
      { next: { revalidate: 30 } } // Cache for 30 seconds
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from DexScreener");
    }

    const data = await response.json();

    // Get the first pair (usually the main liquidity pool)
    const pair = data.pairs?.[0];

    if (!pair) {
      return NextResponse.json({
        price: 0,
        marketCap: 0,
        volume24h: 0,
        priceChange24h: 0,
        liquidity: 0,
        holders: null, // DexScreener doesn't provide holders
      });
    }

    return NextResponse.json({
      price: parseFloat(pair.priceUsd || "0"),
      marketCap: pair.marketCap || pair.fdv || 0,
      volume24h: pair.volume?.h24 || 0,
      priceChange24h: pair.priceChange?.h24 || 0,
      liquidity: pair.liquidity?.usd || 0,
      pairAddress: pair.pairAddress,
      dexId: pair.dexId,
    });
  } catch (error) {
    console.error("Error fetching token stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch token stats" },
      { status: 500 }
    );
  }
}
