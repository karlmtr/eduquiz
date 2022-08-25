const isTeacher = (email: string | undefined | null) =>
  email?.endsWith("@galantay.com") || email?.endsWith("@edu.ge.ch");

export { isTeacher };
