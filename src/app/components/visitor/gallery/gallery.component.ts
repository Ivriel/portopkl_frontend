// gallery.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiResponsePortfolioGallery, PortfolioGallery } from '../../../shared/interfaces/portfolio-gallery';
import { VisitorService } from '../visitor.service';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit{
  galleryLists:PortfolioGallery[] = []

  constructor(private visitorService:VisitorService){}

  ngOnInit(): void {
    this.getPortfolioGallery()
  }

  getPortfolioGallery(){
    this.visitorService.getPortfolioGallery().subscribe({
      next:(res:ApiResponsePortfolioGallery<PortfolioGallery[]>) => {
        this.galleryLists = res.data
        console.log("Gallery",this.galleryLists)
      },
      error:(error:any)=> {
        console.error("Error getting portfolio gallery: ",error)
      }
    })
  }

  galleryItems = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'Full-stack online shopping platform with payment gateway integration',
      tags: ['Angular', 'Node.js', 'MongoDB'],
      size: 'large',
      featured: true
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop',
      title: 'Analytics Dashboard',
      category: 'UI/UX Design',
      description: 'Real-time data visualization dashboard for business intelligence',
      tags: ['React', 'D3.js', 'Tailwind'],
      size: 'medium',
      featured: false
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=600&fit=crop',
      title: 'Mobile Banking App',
      category: 'Mobile App',
      description: 'Secure and intuitive mobile banking application',
      tags: ['Flutter', 'Firebase', 'REST API'],
      size: 'small',
      featured: false
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
      title: 'Portfolio Website',
      category: 'Web Design',
      description: 'Modern and responsive portfolio website',
      tags: ['Angular', 'Tailwind', 'GSAP'],
      size: 'small',
      featured: false
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
      title: 'Task Management System',
      category: 'Full Stack',
      description: 'Collaborative project management tool with real-time updates',
      tags: ['Vue.js', 'Laravel', 'MySQL'],
      size: 'large',
      featured: true
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
      title: 'Social Media API',
      category: 'Backend',
      description: 'RESTful API for social networking platform',
      tags: ['Express', 'MongoDB', 'JWT'],
      size: 'small',
      featured: false
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=600&fit=crop',
      title: 'AI Chatbot',
      category: 'Machine Learning',
      description: 'Intelligent chatbot with natural language processing',
      tags: ['Python', 'TensorFlow', 'NLP'],
      size: 'medium',
      featured: false
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop',
      title: 'Event Management',
      category: 'Web App',
      description: 'Complete event planning and ticketing system',
      tags: ['React', 'Node.js', 'Stripe'],
      size: 'small',
      featured: false
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=600&fit=crop',
      title: 'Food Delivery App',
      category: 'Mobile App',
      description: 'On-demand food delivery mobile application',
      tags: ['React Native', 'Firebase', 'Maps API'],
      size: 'medium',
      featured: false
    },
    {
      id: 10,
      image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=600&h=400&fit=crop',
      title: 'CRM System',
      category: 'Web Development',
      description: 'Customer relationship management platform',
      tags: ['Angular', 'Spring Boot', 'PostgreSQL'],
      size: 'small',
      featured: false
    },
    {
      id: 11,
      image: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=600&h=400&fit=crop',
      title: 'Fitness Tracker',
      category: 'Mobile App',
      description: 'Personal fitness and workout tracking app',
      tags: ['Swift', 'HealthKit', 'CoreData'],
      size: 'small',
      featured: false
    },
    {
      id: 12,
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop',
      title: 'Cloud Storage Platform',
      category: 'Full Stack',
      description: 'Secure cloud storage and file sharing solution',
      tags: ['React', 'AWS', 'Docker'],
      size: 'large',
      featured: true
    }
  ];

  selectedCategory: string = 'all';
  
  categories = [
    { value: 'all', label: 'Office' },
    { value: 'Web Development', label: 'Project Web' },
    { value: 'Mobile App', label: 'Project Mobile' },

  ];

  get filteredItems() {
    if (this.selectedCategory === 'all') {
      return this.galleryItems;
    }
    return this.galleryItems.filter(item => item.category === this.selectedCategory);
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
  }
}