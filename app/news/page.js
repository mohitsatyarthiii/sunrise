// app/news/page.js
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Newspaper,
  Globe,
  Calendar,
  Clock,
  ExternalLink,
  Search,
  RefreshCw,
  Filter,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Ship,
  Package,
  DollarSign,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("import export");
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);

  const categories = [
    {
      id: "import export",
      name: "All Trade News",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      id: "shipping",
      name: "Shipping & Logistics",
      icon: <Ship className="h-4 w-4" />,
    },
    {
      id: "trade war",
      name: "Trade Wars",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      id: "export restrictions",
      name: "Export Restrictions",
      icon: <Package className="h-4 w-4" />,
    },
    {
      id: "customs duties",
      name: "Customs & Duties",
      icon: <DollarSign className="h-4 w-4" />,
    },
    { id: "uae trade", name: "UAE Trade", icon: <Globe className="h-4 w-4" /> },
  ];

  const fetchNews = async (resetPage = true) => {
    setLoading(true);
    setError(null);

    try {
      const query = searchQuery || selectedCategory;

      const response = await fetch(
        `/api/news?q=${encodeURIComponent(query)}&page=${resetPage ? 1 : page}`,
      );

      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors.join(", "));
      }

      if (resetPage) {
        setNews(data.articles || []);
        setPage(1);
      } else {
        setNews((prev) => [...prev, ...(data.articles || [])]);
        setPage((prev) => prev + 1);
      }

      setTotalArticles(data.totalArticles || 0);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      setError(err.message || "Failed to fetch news");
      console.error("News fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchNews(true);
  }, [selectedCategory]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(true);
  };

  // Load more
  const loadMore = () => {
    fetchNews(false);
  };

  // Refresh news
  const refreshNews = () => {
    fetchNews(true);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  // Truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  // Get source favicon
  const getSourceFavicon = (url) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 px-4 py-2">
              <Newspaper className="h-4 w-4 mr-2" />
              Live Trade News
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Global Trade
              <span className="block text-blue-300">News & Updates</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mb-6">
              Stay updated with the latest import-export news, trade policies,
              and market trends from around the world.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search trade news, countries, products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-32 py-6 text-lg bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 hover:bg-gray-100"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Last Updated */}
            {lastUpdated && (
              <p className="text-sm text-blue-200 mt-4 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Last updated: {lastUpdated}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white border-b sticky top-16 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="h-5 w-5 text-gray-400 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSearchQuery("");
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat.id && !searchQuery
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={refreshNews}
              className="ml-auto shrink-0"
              title="Refresh news"
            >
              <RefreshCw
                className={`h-5 w-5 ${loading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Loading State */}
          {loading && news.length === 0 && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Fetching latest trade news...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <Card className="border-0 shadow-lg bg-red-50">
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-red-700 mb-2">
                  Failed to load news
                </h3>
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={refreshNews} variant="outline">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}

          {/* News Count */}
          {!loading && !error && news.length > 0 && (
            <p className="text-sm text-gray-500 mb-6">
              Showing {news.length} of {totalArticles} articles
            </p>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                      <Newspaper className="h-12 w-12 text-white/50" />
                    </div>
                  )}

                  {/* Source Badge */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                    {getSourceFavicon(article.url) && (
                      <img
                        src={getSourceFavicon(article.url)}
                        alt=""
                        className="w-4 h-4 rounded-full"
                      />
                    )}
                    <span className="text-xs text-white font-medium">
                      {article.source.name}
                    </span>
                  </div>

                  {/* Time Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs text-white flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Title */}
                  <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {truncateText(article.description, 150)}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>

                  {/* Read More Button */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group/btn"
                  >
                    Read Full Article
                    <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {!loading && !error && news.length === 0 && (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <Newspaper className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-2xl font-bold mb-2">No news found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or category to find trade news.
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory("import export");
                    setSearchQuery("");
                  }}
                  variant="outline"
                >
                  View All News
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Load More */}
          {!loading &&
            !error &&
            news.length > 0 &&
            news.length < totalArticles && (
              <div className="text-center mt-8">
                <Button
                  onClick={loadMore}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <>Loading...</>
                  ) : (
                    <>
                      Load More News
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            )}
        </div>
      </section>

      {/* Trade Insights Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-none px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Trade Insights
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Stay Ahead in <span className="text-blue-600">Global Trade</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get real-time updates on trade policies, market trends, and
              opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold mb-2">Daily Updates</h3>
                <p className="text-sm text-gray-600">
                  Fresh news every day from 50,000+ sources
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold mb-2">Market Trends</h3>
                <p className="text-sm text-gray-600">
                  Real-time updates on trade flows and prices
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ship className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold mb-2">Shipping Updates</h3>
                <p className="text-sm text-gray-600">
                  Port news, routes, and logistics updates
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-bold mb-2">Trade Policies</h3>
                <p className="text-sm text-gray-600">
                  Customs, duties, and regulation changes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Never Miss Important Trade News
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to get daily trade news updates directly in your inbox
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-blue-200 mt-3">
              Free newsletter. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
