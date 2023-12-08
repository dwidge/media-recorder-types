export const medias = ["video", "audio"] as const;
export type Media = (typeof medias)[number];

export const containers = [
  "webm",
  "ogg",
  "mp3",
  "mp4",
  "x-matroska",
  "3gpp",
  "3gpp2",
  "3gp2",
  "quicktime",
  "mpeg",
  "aac",
  "flac",
  "x-flac",
  "wave",
  "wav",
  "x-wav",
  "x-pn-wav",
  "not-supported",
] as const;
export type Container = (typeof containers)[number];

export const codecs = [
  "vp9",
  "vp9.0",
  "vp8",
  "vp8.0",
  "avc1",
  "av1",
  "av01",
  "h265",
  "h.265",
  "h264",
  "h.264",
  "opus",
  "vorbis",
  "pcm",
  "aac",
  "mpeg",
  "mp4a",
  "rtx",
  "red",
  "ulpfec",
  "g722",
  "pcmu",
  "pcma",
  "cn",
  "daala",
  "telephone-event",
  "not-supported",
] as const;
export type Codec = (typeof codecs)[number];

// https://stackoverflow.com/a/68236494
export function getSupportedMimeTypes(
  medias: readonly Media[],
  containers: readonly Container[],
  codecs: readonly Codec[]
): string[] {
  return [
    ...new Set(
      containers.flatMap((ext) =>
        medias.flatMap((media) => [`${media}/${ext}`])
      )
    ),
    ...new Set(
      containers.flatMap((ext) =>
        codecs.flatMap((codec) =>
          medias.flatMap((media) => [`${media}/${ext};codecs=${codec}`])
        )
      )
    ),
    ...new Set(
      containers.flatMap((ext) =>
        codecs.flatMap((codec1) =>
          codecs.flatMap((codec2) =>
            medias.flatMap((media) => [
              `${media}/${ext};codecs="${codec1}, ${codec2}"`,
            ])
          )
        )
      )
    ),
  ].filter((variation) => MediaRecorder.isTypeSupported(variation));
}

export const supportedVideoTypes = getSupportedMimeTypes(
  ["video"],
  containers,
  codecs
);

export const supportedAudioTypes = getSupportedMimeTypes(
  ["audio"],
  containers,
  codecs
);
