const convertId = (id: number) => {
  // TODO: make a separate return with unique numbers for Kitsu
  // unique number for AniList notes to keep them consistent
  return "414c5f414354" + id.toString(16).padStart(32 - "414c5f414354".length, "0");
}
export default convertId;