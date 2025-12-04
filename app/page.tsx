import Hero from "@/components/home/Hero"
import Quiz from "@/components/home/Quiz"
import Services from "@/components/home/Services"
import ArticlesPreview from "@/components/home/ArticlesPreview"
import ContactCTA from "@/components/home/ContactCTA"

export default function Home() {
  return (
    <>
      <Hero />
      <Quiz />
      <Services />
      <ArticlesPreview />
      <ContactCTA />
    </>
  )
}
