import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Test for the Blog component', () => {
    beforeEach(()=>{
        // create blog, blogs, and setBlogs to be tested in Blog component
        const blog = {
            author: 'test author',
            title: 'test title',
            url: 'test url',
            likes: 10
        }
        const mockBlogs = []
        const mockSetBlogs = jest.fn()
    
        render(
            <Blog blog={blog} blogs={mockBlogs} setBlogs={mockSetBlogs}/>
        ).container
    })
    test('Title is rendered, likes and url not rendered', () => {
        const titleElement = screen.queryByText('title')
        const authorElement = screen.queryByText('test author')
        const urlElement = screen.queryByText('test url')
        const likesElement = screen.queryAllByPlaceholderText('likes')
    
        expect(titleElement).toBeDefined()
        expect(authorElement).toBeNull()
        expect(urlElement).toBeNull()
        expect(likesElement.length).toBe(0)
    })

    test('Url and likes are shwon when button clicked', async ()=>{
        const user = userEvent.setup()
        const button = screen.getByText('show all')
        // user clicks the button
        await user.click(button)

        const titleElement = screen.queryByText('title')
        const authorElement = screen.queryByText('test author')
        const urlElement = screen.queryByText('test url')
        const likesElement = screen.queryAllByPlaceholderText('likes')

        expect(titleElement).toBeDefined()
        expect(authorElement).toBeDefined()
        expect(urlElement).toBeDefined()
        expect(likesElement.length).toBe(1)
        
    })

    test('like button responds correctly', async () => {
        const user = userEvent.setup()
        const likeButton = screen.getByText('like')
        await user.click(likeButton)

    })
})