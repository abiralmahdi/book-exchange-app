import React from 'react'
import { Carousel } from 'react-bootstrap'
import './MainCarousel.css'

function MainCarousel() {
    return (
        <div className='mainCarDiv'>
            <img alt='Image Unavailable' src='https://www.british-study.com/en/wp-content/uploads/sites/2/2013/11/Pile-of-books-1.jpg' className='adImg'/>

            <Carousel fade={true}>
                <Carousel.Item interval={3000}>
                    <img
                    className="d-block c-img w-100"
                    src="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                    className="d-block c-img w-100"
                    src="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop"
                    alt="Second slide"
                    />
                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                    className="d-block c-img w-100"
                    src="https://www.british-study.com/en/wp-content/uploads/sites/2/2013/11/Pile-of-books-1.jpg"
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>


</div>
    )
}

export default MainCarousel
