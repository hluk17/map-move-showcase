import { useState } from "react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const galleryImages = [
  {
    src: gallery1,
    alt: "Modern warehouse with organized logistics operations",
    title: "Warehouse Operations",
  },
  {
    src: gallery2,
    alt: "Delivery truck being loaded with furniture",
    title: "Residential Moving",
  },
  {
    src: gallery3,
    alt: "Professional handling of packages",
    title: "Package Handling",
  },
  {
    src: gallery4,
    alt: "Commercial office moving services",
    title: "Commercial Transport",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Our Work</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of our successful projects and satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg cursor-pointer shadow-soft hover:shadow-medium transition-all duration-300"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full">
              <button
                className="absolute top-4 right-4 text-foreground hover:text-accent text-4xl font-light"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="w-full h-auto rounded-lg shadow-medium"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
