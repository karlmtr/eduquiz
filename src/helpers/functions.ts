const isTeacher = (email: string | undefined | null) =>
  email?.endsWith("@galantay.com") || email?.endsWith("@eduge.ch");

export { isTeacher };
