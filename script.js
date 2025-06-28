import { AuthManager } from './src/auth.js'

// Initialize auth manager
const auth = new AuthManager()

// DOM elements
const authForm = document.getElementById('auth-form')
const loginTab = document.getElementById('login-tab')
const signupTab = document.getElementById('signup-tab')
const authSubmit = document.getElementById('auth-submit')
const authMessage = document.getElementById('auth-message')
const protectedContent = document.getElementById('protected-content')
const adminContent = document.getElementById('admin-content')
const authRequired = document.getElementById('auth-required')

let isLoginMode = true

// Tab switching
if (loginTab && signupTab) {
  loginTab.addEventListener('click', () => {
    isLoginMode = true
    loginTab.classList.add('active')
    signupTab.classList.remove('active')
    authSubmit.textContent = 'Login'
    clearMessage()
  })

  signupTab.addEventListener('click', () => {
    isLoginMode = false
    signupTab.classList.add('active')
    loginTab.classList.remove('active')
    authSubmit.textContent = 'Sign Up'
    clearMessage()
  })
}

// Form submission
if (authForm) {
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    showMessage('Processing...', 'info')
    
    let result
    if (isLoginMode) {
      result = await auth.signIn(email, password)
    } else {
      result = await auth.signUp(email, password)
    }
    
    if (result.success) {
      if (isLoginMode) {
        showMessage('Login successful!', 'success')
      } else {
        showMessage('Account created successfully! Please check your email for verification.', 'success')
      }
      authForm.reset()
    } else {
      showMessage(result.error, 'error')
    }
  })
}

// Check auth state on page load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    checkPageAccess()
  }, 1000) // Give auth time to initialize
})

function checkPageAccess() {
  const currentPage = window.location.pathname
  
  if (currentPage === '/' || currentPage === '/index.html') {
    // Home page - show appropriate content
    if (auth.isAuthenticated()) {
      if (protectedContent) protectedContent.style.display = 'block'
    }
  } else if (currentPage === '/Admin.html') {
    // Admin page - require authentication
    if (auth.isAuthenticated()) {
      if (adminContent) adminContent.style.display = 'block'
      if (authRequired) authRequired.style.display = 'none'
      loadAdminData()
    } else {
      if (adminContent) adminContent.style.display = 'none'
      if (authRequired) authRequired.style.display = 'block'
    }
  }
}

function loadAdminData() {
  const userCountEl = document.getElementById('user-count')
  const userEmailEl = document.getElementById('user-email')
  
  if (userCountEl) userCountEl.textContent = '1' // Placeholder
  if (userEmailEl && auth.getUser()) {
    userEmailEl.textContent = auth.getUser().email
  }
}

function showMessage(message, type) {
  if (authMessage) {
    authMessage.textContent = message
    authMessage.className = `auth-message ${type}`
    authMessage.style.display = 'block'
  }
}

function clearMessage() {
  if (authMessage) {
    authMessage.style.display = 'none'
  }
}

// Listen for auth state changes
window.addEventListener('authStateChanged', checkPageAccess)

console.log('Authentication system initialized')