import Link from 'next/link';
import { ArrowRight, Zap, Database, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-primary/10 via-white to-secondary/10">
      <div className="container mx-auto px-4 py-16 lg:py-32">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 gradient-text">
            Showcase Your Code
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create a beautiful, interactive portfolio from your GitHub repositories.
            Add favorites, comments, and track analytics all in one place.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/signup"
              className="bg-primary hover:bg-secondary text-white font-bold py-4 px-8 rounded-lg transition flex items-center gap-2"
            >
              Get Started <ArrowRight size={20} />
            </Link>
            <Link
              href="/login"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-4 px-8 rounded-lg transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-blue-600" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Auto-Sync</h3>
            <p className="text-gray-600">
              Automatically fetch and display all your GitHub repositories with real-time stats.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Database className="text-purple-600" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Database</h3>
            <p className="text-gray-600">
              Mark favorites, add comments, and track everything with our powerful PostgreSQL backend.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="text-green-600" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Analytics</h3>
            <p className="text-gray-600">
              See detailed insights about your portfolio views, favorites, and engagement.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-lg p-12 mb-20">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">100%</div>
              <p className="text-gray-600">GitHub Integrated</p>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">Real-time</div>
              <p className="text-gray-600">Data Updates</p>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">Unlimited</div>
              <p className="text-gray-600">Portfolios</p>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">Forever</div>
              <p className="text-gray-600">Free & Open</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to showcase your work?</h2>
          <p className="text-gray-600 mb-8">
            Join developers who are building amazing portfolios with us.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-primary hover:bg-secondary text-white font-bold py-4 px-10 rounded-lg transition"
          >
            Create Your Portfolio Now
          </Link>
        </div>
      </div>
    </div>
  );
}
