import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
   <Layout title={"About us - Ecommerce app"}>
    
    <div className="p-4  d-flex">
    
    <div className ="col-md-6">
    <img
       src="images/Screenshot 2023-12-30 225000.png"
       alt="contactus "
       style={{width: "90%"}}
       
       />

   </div>
   <div className="col-md-4 p-4">
    
    <p className="text-justify mt-2">
    Lorem Ipsum is simply dummy text of
     the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy
       text ever since the 1500s, when an unknown printer
        took a galley of type and scrambled it to make a 
        type specimen book. It has survived not only five
         centuries, but also the leap into electronic typesetting, 
         remaining essentially unchanged. It was popularised in the
          1960s with the release of Letraset sheets containing Lorem Ipsum passages,
           and more recently with desktop publishing software like Aldus
           PageMaker including versions of Lorem Ipsum
    </p>
   
      </div>
   </div>
   </Layout>
  );
};

export default About;