
const BackgroundElements = () => {
  return (
    <>
      {/* Enhanced Background Layers */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-100/40 via-pink-100/40 to-blue-100/40 dark:from-purple-600/10 dark:via-pink-600/10 dark:to-blue-600/10 animate-gradientMove"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-200/30 via-transparent to-purple-200/30 dark:from-blue-700/5 dark:via-transparent dark:to-purple-700/5"></div>
      
      {/* Enhanced Floating Orbs */}
      <div className="hidden lg:block fixed top-20 left-10 w-40 h-40 bg-gradient-to-r from-purple-400/40 to-pink-400/40 dark:from-purple-500/20 dark:to-pink-500/20 rounded-full blur-3xl opacity-70 animate-float"></div>
      <div className="hidden lg:block fixed bottom-32 right-20 w-36 h-36 bg-gradient-to-r from-blue-400/40 to-cyan-400/40 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-full blur-2xl opacity-60 animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="hidden md:block fixed top-1/2 left-1/4 w-28 h-28 bg-gradient-to-r from-pink-400/30 to-purple-400/30 dark:from-pink-500/15 dark:to-purple-500/15 rounded-full blur-xl opacity-50 animate-float" style={{ animationDelay: "4s" }}></div>
      <div className="hidden xl:block fixed top-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 dark:from-cyan-500/15 dark:to-blue-500/15 rounded-full blur-lg opacity-45 animate-float" style={{ animationDelay: "6s" }}></div>
      <div className="hidden lg:block fixed bottom-1/4 left-1/3 w-32 h-32 bg-gradient-to-r from-indigo-400/35 to-purple-400/35 dark:from-indigo-500/18 dark:to-purple-500/18 rounded-full blur-2xl opacity-55 animate-float" style={{ animationDelay: "8s" }}></div>
    </>
  );
};

export default BackgroundElements;
