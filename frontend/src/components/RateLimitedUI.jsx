import React from 'react';
import { ZapIcon } from 'lucide-react';

const RateLimitedUI = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <ZapIcon className="size-10 text-yellow-500 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Rate Limit Exceeded</h2>
      <p className="text-center max-w-md">
        You have exceeded the allowed number of requests. Please wait a moment before trying again.
      </p>
    </div>
  );
};

export default RateLimitedUI;
