import React from "react";
import { Composition } from "remotion";
import { InstagramStory, InstagramStoryProps } from "./compositions/InstagramStory";
import { InstagramReel, InstagramReelProps } from "./compositions/InstagramReel";
import { InstagramPost, InstagramPostProps } from "./compositions/InstagramPost";
import { PromoVideo, PromoVideoProps } from "./compositions/PromoVideo";
import { SaleAnnouncement, SaleAnnouncementProps } from "./compositions/SaleAnnouncement";

// Instagram Story: 1080x1920, 9:16, 15s @ 30fps
const STORY_DURATION = 15 * 30;
// Instagram Reel: 1080x1920, 9:16, 5s @ 30fps
const REEL_DURATION = 5 * 30;
// Instagram Post: 1080x1080, 1:1, 8s @ 30fps
const POST_DURATION = 8 * 30;
// Promo Video: 1080x1920, 9:16, 7s @ 30fps
const PROMO_DURATION = 7 * 30;
// Sale Announcement: 1080x1080, 1:1, 6s @ 30fps
const SALE_DURATION = 6 * 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ─── Instagram Story (9:16 vertical) ─── */}
      <Composition<InstagramStoryProps>
        id="InstagramStory"
        component={InstagramStory}
        durationInFrames={STORY_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          brandName: "HeroMotion",
          tagline: "Move the world",
          headline: "Your Story Starts Here",
          subheadline: "Create stunning motion graphics that captivate your audience.",
          ctaText: "Swipe Up",
          badgeText: "New Drop",
          paletteName: "neon",
        }}
      />

      {/* ─── Instagram Reel (9:16 vertical) ─── */}
      <Composition<InstagramReelProps>
        id="InstagramReel"
        component={InstagramReel}
        durationInFrames={REEL_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          brandName: "HeroMotion",
          headline: "Results That Speak Volumes",
          subheadline: "Join thousands of creators building unforgettable brands.",
          ctaText: "Follow Now",
          stat1Value: "10M+",
          stat1Label: "Views",
          stat2Value: "98%",
          stat2Label: "Satisfaction",
          stat3Value: "5x",
          stat3Label: "Engagement",
          badgeText: "Trending",
          paletteName: "sunset",
        }}
      />

      {/* ─── Instagram Post (1:1 square) ─── */}
      <Composition<InstagramPostProps>
        id="InstagramPost"
        component={InstagramPost}
        durationInFrames={POST_DURATION}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          brandName: "HeroMotion",
          tagline: "Motion for brands",
          headline: "Stand Out From The Crowd",
          subheadline: "Premium motion graphics for forward-thinking brands.",
          ctaText: "Learn More",
          badgeText: "Featured",
          skill1: "Brand Awareness",
          skill1Pct: 95,
          skill2: "Engagement Rate",
          skill2Pct: 87,
          skill3: "Conversion Boost",
          skill3Pct: 72,
          paletteName: "ocean",
        }}
      />

      {/* ─── Promo Video (9:16 vertical) ─── */}
      <Composition<PromoVideoProps>
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={PROMO_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          brandName: "HeroMotion",
          tagline: "Move the world",
          headline: "The Future Is Motion",
          offerText: "Exclusive Launch Offer",
          subheadline: "Get 50% off your first campaign. Limited time only.",
          ctaText: "Claim Your Deal",
          discountText: "50% OFF",
          countdownLabel: "Offer ends in",
          daysLeft: 3,
          paletteName: "neon",
        }}
      />

      {/* ─── Sale Announcement (1:1 square) ─── */}
      <Composition<SaleAnnouncementProps>
        id="SaleAnnouncement"
        component={SaleAnnouncement}
        durationInFrames={SALE_DURATION}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          saleLabel: "Flash Sale",
          headline: "Everything Must Go",
          discountAmount: "70",
          discountUnit: "% OFF",
          subtext: "Use code HERO70 at checkout. Today only.",
          ctaText: "Shop Now",
          paletteName: "sunset",
        }}
      />

      {/* ─── Neon Story variant ─── */}
      <Composition<InstagramStoryProps>
        id="InstagramStory_Gold"
        component={InstagramStory}
        durationInFrames={STORY_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          brandName: "LuxBrand",
          tagline: "Crafted for excellence",
          headline: "Elevate Your Brand",
          subheadline: "Where luxury meets modern motion design.",
          ctaText: "Discover More",
          badgeText: "Exclusive",
          paletteName: "gold",
        }}
      />

      {/* ─── Forest/Wellness Post ─── */}
      <Composition<InstagramPostProps>
        id="InstagramPost_Forest"
        component={InstagramPost}
        durationInFrames={POST_DURATION}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          brandName: "EcoWell",
          tagline: "Nature-inspired",
          headline: "Grow With Purpose",
          subheadline: "Wellness content that connects with conscious communities.",
          ctaText: "Join Movement",
          badgeText: "Organic",
          skill1: "Community Growth",
          skill1Pct: 91,
          skill2: "Organic Reach",
          skill2Pct: 83,
          skill3: "Customer Trust",
          skill3Pct: 97,
          paletteName: "forest",
        }}
      />
    </>
  );
};
