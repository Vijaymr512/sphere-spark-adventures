
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16 bg-kidz-background">
        <div className="kidz-container">
          <h1 className="text-4xl font-bold mb-6 gradient-text">About KidzSphere</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-kidz-dark">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              KidzSphere is dedicated to creating a safe, engaging, and educational digital space for children. 
              We believe in nurturing young minds through interactive activities, creative challenges, and educational content.
            </p>
            <p className="text-gray-700">
              Our AI-enhanced platform adapts to each child's interests and learning style, providing personalized experiences 
              that make learning fun and effective.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-kidz-dark">Our Values</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-kidz-light p-2 rounded-full mr-3 mt-1">
                    <span className="text-kidz-primary font-bold">1</span>
                  </div>
                  <p className="text-gray-700"><span className="font-semibold">Safety First:</span> Creating a secure digital environment for children.</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-kidz-light p-2 rounded-full mr-3 mt-1">
                    <span className="text-kidz-primary font-bold">2</span>
                  </div>
                  <p className="text-gray-700"><span className="font-semibold">Learning Through Play:</span> Making education enjoyable and engaging.</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-kidz-light p-2 rounded-full mr-3 mt-1">
                    <span className="text-kidz-primary font-bold">3</span>
                  </div>
                  <p className="text-gray-700"><span className="font-semibold">Creativity:</span> Encouraging imagination and original thinking.</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-kidz-light p-2 rounded-full mr-3 mt-1">
                    <span className="text-kidz-primary font-bold">4</span>
                  </div>
                  <p className="text-gray-700"><span className="font-semibold">Wellness:</span> Supporting the holistic development of children.</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-kidz-dark">Why KidzSphere?</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-kidz-light p-2 rounded-full mr-3 mt-1">
                    <span className="text-kidz-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Personalized learning experiences powered by AI</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-kidz-light p-2 rounded-full mr-3 mt-1">
                    <span className="text-kidz-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Fun and engaging activities that educate while entertaining</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-kidz-light p-2 rounded-full mr-3 mt-1">
                    <span className="text-kidz-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Balanced screen time with suggestions for offline activities</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-kidz-light p-2 rounded-full mr-3 mt-1">
                    <span className="text-kidz-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Safe, age-appropriate content curated by experts</p>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-kidz-dark">Our Team</h2>
            <p className="text-gray-700 mb-6">
              KidzSphere is created by a diverse team of educators, child psychologists, designers, and technology experts
              who are passionate about children's development and digital well-being.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-kidz-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-kidz-primary">EB</span>
                </div>
                <h3 className="font-bold">Emma Brooks</h3>
                <p className="text-gray-600 text-sm">Education Director</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-kidz-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-kidz-primary">MJ</span>
                </div>
                <h3 className="font-bold">Miguel Johnson</h3>
                <p className="text-gray-600 text-sm">Technology Lead</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-kidz-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-kidz-primary">LP</span>
                </div>
                <h3 className="font-bold">Lisa Park</h3>
                <p className="text-gray-600 text-sm">Child Psychology Expert</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
