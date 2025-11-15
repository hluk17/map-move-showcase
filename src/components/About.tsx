const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Biz Kimiz</h2>
          </div>
          
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed mb-6">
              [Buraya şirket hakkında bilgi gelecek - metin içeriğini siz yazacaksınız]
            </p>
            <p className="text-lg leading-relaxed">
              [İkinci paragraf buraya gelecek]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
