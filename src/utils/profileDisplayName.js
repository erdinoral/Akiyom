export function getProfileDisplayName(user, profile) {
  const username = profile?.username?.trim();
  const fullName = profile?.full_name?.trim();
  const metaName = user?.user_metadata?.full_name?.trim();
  const emailPrefix = user?.email?.split('@')[0];

  return username || fullName || metaName || emailPrefix || 'Üye';
}
