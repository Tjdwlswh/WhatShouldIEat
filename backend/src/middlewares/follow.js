const followData = (req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingList = req.user?.Following?.map(f => f.id) || [];
  next();
};

export { followData };
