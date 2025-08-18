import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid3X3,
  List,
  Camera,
  Users,
  Award,
  Code,
  Presentation,
  Coffee,
} from 'lucide-react';
import { Container } from '../components/layout';
import { ScrollAnimation } from '../components/animations';
import { Button } from '../components/ui';
import { useDocumentTitle } from '../hooks';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
  description?: string;
  photographer?: string;
  date?: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  count: number;
}

const Gallery = () => {
  useDocumentTitle('Gallery - AfCFTA Digital Trade Protocol Hackathon');

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  // Sample gallery images - in a real app, these would come from an API or CMS
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: '/assets/img/gallery/hackathon-opening.jpg',
      alt: 'Hackathon Opening Ceremony',
      title: 'Opening Ceremony',
      category: 'event',
      description: 'Participants gathering for the hackathon opening ceremony',
      photographer: 'AfCFTA Team',
      date: '2024-03-15',
    },
    {
      id: 2,
      src: '/assets/img/gallery/team-collaboration.jpg',
      alt: 'Teams collaborating on projects',
      title: 'Team Collaboration',
      category: 'teams',
      description: 'Teams working together to develop innovative solutions',
      photographer: 'Event Photography',
      date: '2024-03-16',
    },
    {
      id: 3,
      src: '/assets/img/gallery/coding-session.jpg',
      alt: 'Intensive coding session',
      title: 'Coding Marathon',
      category: 'development',
      description: 'Participants deep in coding during the development phase',
      photographer: 'Tech Media',
      date: '2024-03-16',
    },
    {
      id: 4,
      src: '/assets/img/gallery/mentorship.jpg',
      alt: 'Mentors guiding participants',
      title: 'Mentorship Session',
      category: 'mentorship',
      description: 'Industry experts providing guidance to hackathon teams',
      photographer: 'AfCFTA Team',
      date: '2024-03-16',
    },
    {
      id: 5,
      src: '/assets/img/gallery/presentation-1.jpg',
      alt: 'Team presenting their solution',
      title: 'Solution Presentation',
      category: 'presentations',
      description: 'Teams presenting their innovative digital trade solutions',
      photographer: 'Event Photography',
      date: '2024-03-17',
    },
    {
      id: 6,
      src: '/assets/img/gallery/judges-panel.jpg',
      alt: 'Panel of expert judges',
      title: 'Expert Judges Panel',
      category: 'judging',
      description: 'Industry leaders evaluating the innovative solutions',
      photographer: 'Tech Media',
      date: '2024-03-17',
    },
    {
      id: 7,
      src: '/assets/img/gallery/networking.jpg',
      alt: 'Networking session',
      title: 'Networking Break',
      category: 'networking',
      description: 'Participants networking and sharing ideas during breaks',
      photographer: 'AfCFTA Team',
      date: '2024-03-16',
    },
    {
      id: 8,
      src: '/assets/img/gallery/awards-ceremony.jpg',
      alt: 'Awards ceremony',
      title: 'Awards Ceremony',
      category: 'awards',
      description: 'Celebrating the winning teams and their achievements',
      photographer: 'Event Photography',
      date: '2024-03-17',
    },
    {
      id: 9,
      src: '/assets/img/gallery/winner-team-1.jpg',
      alt: 'First place winners',
      title: 'First Place Winners',
      category: 'awards',
      description: 'The winning team celebrating their victory',
      photographer: 'Tech Media',
      date: '2024-03-17',
    },
    {
      id: 10,
      src: '/assets/img/gallery/demo-day.jpg',
      alt: 'Demo day presentations',
      title: 'Demo Day',
      category: 'presentations',
      description: 'Final day demonstrations of all developed solutions',
      photographer: 'AfCFTA Team',
      date: '2024-03-17',
    },
    {
      id: 11,
      src: '/assets/img/gallery/team-diversity.jpg',
      alt: 'Diverse team of participants',
      title: 'Diverse Participation',
      category: 'teams',
      description:
        'Showcasing the diversity of participants from across Africa',
      photographer: 'Event Photography',
      date: '2024-03-15',
    },
    {
      id: 12,
      src: '/assets/img/gallery/innovation-showcase.jpg',
      alt: 'Innovation showcase',
      title: 'Innovation Showcase',
      category: 'development',
      description:
        'Displaying the innovative solutions developed during the hackathon',
      photographer: 'Tech Media',
      date: '2024-03-17',
    },
  ];

  const categories: Category[] = [
    {
      id: 'all',
      name: 'All Photos',
      icon: Camera,
      count: galleryImages.length,
    },
    {
      id: 'event',
      name: 'Event Highlights',
      icon: Award,
      count: galleryImages.filter(img => img.category === 'event').length,
    },
    {
      id: 'teams',
      name: 'Teams',
      icon: Users,
      count: galleryImages.filter(img => img.category === 'teams').length,
    },
    {
      id: 'development',
      name: 'Development',
      icon: Code,
      count: galleryImages.filter(img => img.category === 'development').length,
    },
    {
      id: 'presentations',
      name: 'Presentations',
      icon: Presentation,
      count: galleryImages.filter(img => img.category === 'presentations')
        .length,
    },
    {
      id: 'awards',
      name: 'Awards',
      icon: Award,
      count: galleryImages.filter(img => img.category === 'awards').length,
    },
    {
      id: 'mentorship',
      name: 'Mentorship',
      icon: Users,
      count: galleryImages.filter(img => img.category === 'mentorship').length,
    },
    {
      id: 'networking',
      name: 'Networking',
      icon: Coffee,
      count: galleryImages.filter(img => img.category === 'networking').length,
    },
    {
      id: 'judging',
      name: 'Judging',
      icon: Award,
      count: galleryImages.filter(img => img.category === 'judging').length,
    },
  ];

  const filteredImages =
    selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;

    const currentIndex = filteredImages.findIndex(
      img => img.id === selectedImage.id
    );
    let newIndex;

    if (direction === 'prev') {
      newIndex =
        currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex =
        currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 to-blue-800/20"></div>
        </div>

        <Container className="relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-purple-200 text-lg">Event</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Event Gallery
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-purple-200"
            >
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ArrowRight className="h-4 w-4" />
              <span>Gallery</span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Capturing Innovation in Action
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Explore moments from the AfCFTA Digital Trade Protocol Hackathon
                - from intense coding sessions to breakthrough presentations,
                witness the journey of innovation that's shaping Africa's
                digital trade future.
              </p>
            </div>
          </ScrollAnimation>
        </Container>
      </section>

      {/* Filter and View Controls */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <Container>
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={
                    selectedCategory === category.id ? 'default' : 'outline'
                  }
                  size="sm"
                  className={`${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <category.icon className="mr-2 h-4 w-4" />
                  {category.name}
                  <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {category.count}
                  </span>
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">View:</span>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant="ghost"
                  size="sm"
                  className={`rounded-none ${
                    viewMode === 'grid'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setViewMode('masonry')}
                  variant="ghost"
                  size="sm"
                  className={`rounded-none ${
                    viewMode === 'masonry'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600'
                  }`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">
        <Container>
          <motion.div
            layout
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'columns-1 md:columns-2 lg:columns-3 xl:columns-4'
            }`}
          >
            {filteredImages.map((image, index) => (
              <ScrollAnimation
                key={image.id}
                animation="fadeIn"
                delay={index * 0.05}
              >
                <motion.div
                  layout
                  whileHover={{ scale: 1.05 }}
                  className={`group cursor-pointer ${
                    viewMode === 'masonry'
                      ? 'break-inside-avoid mb-6'
                      : 'aspect-square'
                  }`}
                  onClick={() => openLightbox(image)}
                >
                  <div className="relative h-full bg-gray-200 rounded-xl overflow-hidden shadow-lg">
                    {/* Placeholder for image */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-600 text-sm font-medium">
                          {image.title}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {image.category}
                        </p>
                      </div>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                      <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-semibold text-lg">{image.title}</h3>
                        {image.description && (
                          <p className="text-sm text-gray-200 mt-1">
                            {image.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollAnimation>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No images found
              </h3>
              <p className="text-gray-500">
                Try selecting a different category
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Button
              onClick={closeLightbox}
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              onClick={e => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              onClick={e => {
                e.stopPropagation();
                navigateImage('next');
              }}
              variant="ghost"
              size="sm"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Image Container */}
            <div
              className="relative max-w-full max-h-full bg-gray-800 rounded-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Placeholder for actual image */}
              <div className="w-full h-96 md:h-[600px] bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-2xl font-bold mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-gray-300">{selectedImage.description}</p>
                </div>
              </div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-xl font-bold mb-2">
                  {selectedImage.title}
                </h3>
                {selectedImage.description && (
                  <p className="text-gray-200 mb-2">
                    {selectedImage.description}
                  </p>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  {selectedImage.photographer && (
                    <span>📸 {selectedImage.photographer}</span>
                  )}
                  {selectedImage.date && (
                    <span>
                      📅 {new Date(selectedImage.date).toLocaleDateString()}
                    </span>
                  )}
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                    {selectedImage.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Call to Action Section */}
      <ScrollAnimation animation="fadeIn">
        <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
          <Container>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Be Part of the Next Chapter
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join us for the next AfCFTA Digital Trade Protocol Hackathon and
                create your own innovation story.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                >
                  <Link to="/application">
                    Apply for Next Event
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-gray-900"
                >
                  <Link to="/about">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </ScrollAnimation>
    </motion.div>
  );
};

export default Gallery;
