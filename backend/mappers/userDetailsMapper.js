function mapUserDetails(user, profile) {
  return {
    userId: user._id,
    fullname: user.fullname,
    phone: user.phone,
    email: user.email,
    isBlocked: user.isBlocked,
    isDeleted: user.isDeleted,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
    avatar:user.avatar,
    avatarThumbStatus:user.avatarThumbStatus,
    thumbnail:user.thumbnail,
    role:user.role,

    profile: profile
      ? {
          profileId: profile._id,
          gender: profile.gender,
          dateOfBirth: profile.dateOfBirth,
          bloodGroup: profile.bloodGroup,
          address: profile.address || {},
          avatar: profile.avatar,
          isProfileCompleted:profile.isProfileCompleted
        }
      : null
  };
}

module.exports = mapUserDetails;
