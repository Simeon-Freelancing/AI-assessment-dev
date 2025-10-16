const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Video upload endpoint
export async function uploadVideo(file) {
  const formData = new FormData();
  formData.append("video", file);

  const response = await fetch(`${API_BASE_URL}/api/videos/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload video");
  }

  return response.json();
}

// Generate subtitles endpoint
export async function generateSubtitles(request) {
  const response = await fetch(`${API_BASE_URL}/api/subtitles/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to generate subtitles");
  }

  return response.json();
}

// Update subtitle segment endpoint
export async function updateSubtitleSegment(videoId, segmentId, updates) {
  const response = await fetch(
    `${API_BASE_URL}/api/subtitles/${videoId}/segments/${segmentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update subtitle segment");
  }
}

// Download SRT file endpoint
export async function downloadSRT(videoId, language) {
  const response = await fetch(
    `${API_BASE_URL}/api/subtitles/${videoId}/download?language=${language}`
  );

  if (!response.ok) {
    throw new Error("Failed to download SRT file");
  }

  return response.blob();
}

// Embed subtitles in video endpoint
export async function embedSubtitles(videoId, language) {
  const response = await fetch(
    `${API_BASE_URL}/api/videos/${videoId}/embed-subtitles`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to embed subtitles");
  }

  return response.blob();
}

// Authentication endpoints
export async function signIn(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to sign in");
  }

  return response.json();
}

export async function signUp(email, password, name) {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });

  if (!response.ok) {
    throw new Error("Failed to sign up");
  }

  return response.json();
}
