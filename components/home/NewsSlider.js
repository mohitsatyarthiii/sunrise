// components/home/NewsSlider.js
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Newspaper,
  Globe,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Ship,
  Package,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function NewsSlider() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch news on mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!autoPlay || news.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [autoPlay, news.length]);

  // Reset autoplay timer when user interacts
  const handleUserInteraction = () => {
    setAutoPlay(false);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/news?q=import export&page=1&pageSize=10');
      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors.join(", "));
      }

      setNews(data.articles?.slice(0, 10) || []);
    } catch (err) {
      setError(err.message);
      console.error("News fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    handleUserInteraction();
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    handleUserInteraction();
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  const goToSlide = (index) => {
    handleUserInteraction();
    setCurrentIndex(index);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      nextSlide();
    } else if (touchStartX.current - touchEndX.current < -50) {
      // Swipe right
      prevSlide();
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  // Get category icon based on title/content
  const getCategoryIcon = (article) => {
    const title = article.title?.toLowerCase() || '';
    const desc = article.description?.toLowerCase() || '';
    
    if (title.includes('ship') || title.includes('port') || title.includes('logistic')) {
      return <Ship className="h-3 w-3" />;
    } else if (title.includes('tariff') || title.includes('duty') || title.includes('custom')) {
      return <Package className="h-3 w-3" />;
    } else if (title.includes('market') || title.includes('price') || title.includes('trade war')) {
      return <TrendingUp className="h-3 w-3" />;
    } else {
      return <Globe className="h-3 w-3" />;
    }
  };

  // Get category color
  const getCategoryColor = (article) => {
    const title = article.title?.toLowerCase() || '';
    
    if (title.includes('ship') || title.includes('port')) {
      return 'bg-purple-100 text-purple-700';
    } else if (title.includes('tariff') || title.includes('duty')) {
      return 'bg-orange-100 text-orange-700';
    } else if (title.includes('market') || title.includes('price')) {
      return 'bg-green-100 text-green-700';
    } else {
      return 'bg-blue-100 text-blue-700';
    }
  };

  if (loading) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <Badge className="mb-2 bg-blue-100 text-blue-700 border-none">
                <Newspaper className="h-3 w-3 mr-1" />
                Latest Trade News
              </Badge>
              <h2 className="text-2xl font-bold">Market Updates</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-600 text-sm">Failed to load news</p>
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <Badge className="mb-2 bg-blue-100 text-blue-700 border-none px-3 py-1">
              <Sparkles className="h-3 w-3 mr-1" />
              Real-time Updates
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Latest in <span className="text-blue-600">Global Trade</span>
            </h2>
            <p className="text-gray-600 mt-2">
              Stay ahead with breaking news and market insights
            </p>
          </div>
          
          {/* View All Button */}
          <Link href="/news">
            <Button variant="outline" className="mt-4 md:mt-0 group">
              View All News
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Main Slider */}
        <div 
          className="relative"
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Featured Slide */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            {/* Background Image with Overlay */}
            <div className="relative h-[400px] md:h-[500px] w-full">
              {news[currentIndex]?.image ? (
                <Image
                  src={news[currentIndex].image}
                  alt={news[currentIndex].title}
                  fill
                  className="object-cover"
                  unoptimized
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                  <Newspaper className="h-20 w-20 text-white/30" />
                </div>
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={`${getCategoryColor(news[currentIndex])} border-none`}>
                    <span className="flex items-center gap-1">
                      {getCategoryIcon(news[currentIndex])}
                      {news[currentIndex].source?.name || 'Trade News'}
                    </span>
                  </Badge>
                  <Badge variant="outline" className="border-white/30 text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(news[currentIndex].publishedAt)}
                  </Badge>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl md:text-4xl font-bold mb-3 line-clamp-2">
                  {news[currentIndex].title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-200 mb-4 line-clamp-2 max-w-3xl">
                  {news[currentIndex].description}
                </p>
                
                {/* Read More Link */}
                <a
                  href={news[currentIndex].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-all group"
                >
                  Read Full Article
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Navigation Arrows (Desktop) */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hidden md:block"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hidden md:block"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="mt-4 grid grid-cols-5 gap-2">
            {news.map((item, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative h-20 rounded-lg overflow-hidden transition-all ${
                  index === currentIndex 
                    ? 'ring-2 ring-blue-600 scale-105 z-10' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600" />
                )}
                <div className="absolute inset-0 bg-black/20" />
              </button>
            ))}
          </div>
        </div>

        {/* Quick News Ticker */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span>Trending Updates</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {news.slice(0, 3).map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  {getCategoryIcon(item)}
                </div>
                <div>
                  <p className="text-sm font-medium line-clamp-2 group-hover:text-blue-600">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(item.publishedAt)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {news.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}