import { func } from "prop-types"

describe('e2e testing', () => {
    beforeEach(function(){
        // reset database
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3000')
		localStorage.clear()
    })

    it('login form is displayed by default', function(){
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login test', () => {
        beforeEach(function(){
            // make a brand new user
            const user = {
                username: 'admin',
                password: 'password'
            }
            cy.request('POST', 'http://localhost:3001/api/users', user)
        })

        it('successful login', function(){
            cy.login({username: 'admin', password: 'password'})
			cy.contains('admin is logged in.')
        })

		it('unsuccessful login', function(){
			cy.get('#username').type('admin')
			cy.get('#password').type('afdgdbssd')
			cy.contains('login').click()
			cy.get('.message')
				.should('contain', 'Username or password incorrect')
		})

		describe('When logged in', () => {
			beforeEach(function(){
				cy.login({username: 'admin', password: 'password'})
			})
	
			it('A blog can be created', function(){
				cy.contains('new blog').click()
				cy.contains('Title').type('test title')
				cy.contains('Author').type('test author')
				cy.contains('url').type('test url')
				cy.get('#create-blog').click()

				cy.get('.blog').should('contain', 'test')
			})

			describe('When a blog is present', function(){
				beforeEach(function(){
					cy.createBlog({
						title: 'test title',
						author: 'test author',
						url: 'test url'
					})
				})

				it('A blog can be liked', function(){
					cy.contains('show all').click()
					cy.get('#like-button').click()
					cy.get('#numberOfLikes').should('contain', '1')
				})

				it('A blog can be deleted', function(){
					cy.contains('delete').click()
					cy.contains('title').should('not.exist')
				})
			})
			
		})
    })
})