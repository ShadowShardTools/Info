const Contact = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-lg text-gray-400">
              Have a question or want to work together?
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="text-center">
              <a href="mailto:shadowshardtools@gmail.com" className="inline-flex w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-400/40 transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <h3 className="text-lg font-medium text-gray-300 mb-2">Email</h3>
            </div>
            
            <div className="text-center">
              <a href="https://discord.gg/QyQACA5YvA" className="inline-flex w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/40 transition-all duration-300">
                <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1901.3718-.287.0254-.0208.0607-.0231.0892-.0065 3.9278 1.7933 8.18 1.7933 12.0614 0a.0756.0756 0 01.0905.0065c.1202.0969.246.1928.3728.287a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8934.0766.0766 0 00-.0407.1056c.3604.698.7719 1.3628 1.225 1.9931a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0312-.0561c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.4189 0 1.3333-.9555 2.419-2.1569 2.419zm7.9748 0c-1.1825 0-2.1568-1.0857-2.1568-2.419 0-1.3332.9554-2.4189 2.1568-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.4189 0 1.3333-.946 2.419-2.1568 2.419Z" />
                </svg>
              </a>
              <h3 className="text-lg font-medium text-gray-300 mb-2">Discord</h3>
            </div>

            <div className="text-center">
              <a href="https://www.linkedin.com/company/shadowshardtools" className="inline-flex w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-700/40 transition-all duration-300">
                <svg className="w-8 h-8" fill="white" viewBox="-4 -4 24 24">
                  <path d="M0 1.1C0 .5.5 0 1.2 0h13.6c.7 0 1.2.5 1.2 1.1V15c0 .6-.5 1.1-1.2 1.1H1.2C.5 16 0 15.5 0 14.9zm5 12.3V6.2H2.4v7.2zM3.6 5.2c.9 0 1.4-.6 1.4-1.3 0-.7-.5-1.2-1.3-1.2s-1.4.5-1.4 1.2.5 1.3 1.3 1.3zm5 8.2V8.8c.2-.5.6-1 1.3-1 .8 0 1.2.8 1.2 1.7v3.9h2.4V9.2C13.6 7 12.4 6 10.8 6 9.5 6 9 6.7 8.7 7.2v-1H6.3v7.2z" />
                </svg>
              </a>
              <h3 className="text-lg font-medium text-gray-300 mb-2">LinkedIn</h3>
            </div>

            <div className="text-center">
              <a href="https://bsky.app/profile/shadowshardtools.bsky.social" className="inline-flex w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500/40 transition-all duration-300">
                <svg className="w-6 h-6" fill="white" viewBox="0 0 32 32">
                  <path d="M7 3.9A37 37 0 0 1 16 15c1.4-3 5.4-8.5 9-11.2 2.6-2 7-3.5 7 1.4 0 1-.6 8.1-1 9.3-1.1 4-5.3 5-9 4.4 6.5 1.1 8.1 4.8 4.6 8.4-6.7 6.9-9.6-1.8-10.4-4L16 23l-.2.4c-.8 2.2-3.7 10.9-10.4 4C1.9 23.8 3.5 20 9.9 19c-3.7.7-7.8-.4-9-4.4a94 94 0 0 1-.8-9.4C0 .4 4.4 2 7 4Zm0 0" />
                </svg>
              </a>
              <h3 className="text-lg font-medium text-gray-300 mb-2">Bluesky</h3>
            </div>

            <div className="text-center">
              <a href="https://www.reddit.com/user/shadowshardtools/" className="inline-flex w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/40 transition-all duration-300">
                <svg className="w-6 h-6" fill="white" viewBox="0 0 32 32">
                  <path d="M23.3 8.7c-1.6 0-2.9-1.1-3.2-2.6a4 4 0 0 0-3.4 3.9c3 .1 5.6 1 7.8 2.3.8-.6 1.8-1 2.8-1a4.7 4.7 0 0 1 2 8.9c-.1 5.4-6 9.8-13.3 9.8-7.3 0-13.2-4.4-13.3-9.8a4.7 4.7 0 1 1 4.8-8 16 16 0 0 1 7.8-2.2c0-2.8 2-5 4.8-5.4a3.3 3.3 0 1 1 3.3 4ZM9.8 16c-1.3 0-2.4 1.3-2.5 3 0 1.6 1.1 2.3 2.4 2.3 1.3 0 2.3-.6 2.4-2.3 0-1.7-1-3-2.3-3Zm14.9 3c0-1.8-1.2-3-2.5-3s-2.3 1.3-2.3 3c.1 1.7 1.1 2.3 2.4 2.3 1.3 0 2.5-.7 2.4-2.4Zm-3.8 4.4c.1-.3 0-.5-.3-.5a46.4 46.4 0 0 0-9.2 0c-.2 0-.4.2-.3.5a5.3 5.3 0 0 0 9.8 0Zm0 0" />
                </svg>
              </a>
              <h3 className="text-lg font-medium text-gray-300 mb-2">Reddit</h3>
            </div>

            <div className="text-center">
              <a href="https://www.artstation.com/valeriideineka" className="inline-flex w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300">
                <svg className="w-6 h-6" fill="white" viewBox="0 0 32 32">
                  <path d="m.1 23.6 2.7 4.6c.6 1.1 1.7 1.8 2.9 1.8h17.8l-3.7-6.4Zm31.3-1.7L21 3.7c-.6-1-1.7-1.7-2.9-1.7h-5.5l16 28 2.6-4.4c.2-.2 1.4-2 .2-3.7ZM17.2 19 10 6.6 2.7 19Zm0 0" />
                </svg>
              </a>
              <h3 className="text-lg font-medium text-gray-300 mb-2">ArtStation</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;