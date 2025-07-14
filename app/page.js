'use client'; // If you're using App Router

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setMessage(" Please enter a valid email.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`,  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
s
      if (res.ok) {
        setMessage("✅ You’ve been added to the waitlist!");
        setEmail("");
      } else {
        setMessage(data?.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" py-10 max-w-7xl mx-auto">
      {/* Logo and Title */}
      <div className="flex  gap-4">
        <Image
          src="/g 2.png"
          alt="Logo"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">
          ScholarGuide Tech
        </p>
      </div>

      {/* Main Content */}
      <div className="mt-16 flex flex-col items-center text-center">
        {/* Hero Line */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <div className="mt-2 flex flex-col items-center">
            <p className="text-3xl sm:text-4xl font-semibold">Explore,</p>
            <Image
              src="/Ellipse 67.png"
              alt="Dot Decoration"
              width={105}
              height={25}
            />
          </div>

          <p className="text-3xl sm:text-4xl font-semibold">
            <span className="text-blue-500">Learn</span> and Connect. All
          </p>
        </div>

        <p className="text-3xl sm:text-4xl font-semibold mt-2">at the same time</p>

        {/* Description */}
        <div className="mt-6 text-base sm:text-lg font-medium max-w-3xl text-gray-700">
          <p>
            A smarter way to <span className="text-blue-500">learn</span> is coming.
            Join thousands getting early access to interactive,{" "}
            <span className="text-green-600">hassle-free</span> learning with the
            support of{" "}
            <span className="text-yellow-500">a robust community</span> — anytime,
            anywhere.
          </p>
        </div>

        {/* Input & Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full max-w-lg">
          <input
            type="email"
            placeholder="Enter e-mail here"
            className="flex-1 w-full p-3 rounded-lg shadow-md text-gray-800 placeholder-gray-500 placeholder:italic focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition-all duration-200 w-full sm:w-auto"
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Subscribe"}
          </button>
        </div>

        {/* Response Message */}
        {message && (
          <p className="mt-4 text-sm font-medium text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
}
