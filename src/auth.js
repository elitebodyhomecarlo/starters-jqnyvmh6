import { supabase } from './supabase.js'

export class AuthManager {
  constructor() {
    this.currentUser = null
    this.init()
  }

  async init() {
    // Get initial session
    const { data: { session } } = await supabase.auth.getSession()
    this.currentUser = session?.user || null
    this.updateUI()

    // Listen for auth changes
    supabase.auth.onAuthStateChange((event, session) => {
      this.currentUser = session?.user || null
      this.updateUI()
    })
  }

  async signUp(email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  isAuthenticated() {
    return !!this.currentUser
  }

  getUser() {
    return this.currentUser
  }

  updateUI() {
    // Update navigation based on auth state
    const guestLink = document.querySelector('nav a[href="/"]')
    const adminLink = document.querySelector('nav a[href="/Admin.html"]')
    const authSection = document.getElementById('auth-section')
    const userInfo = document.getElementById('user-info')

    if (this.isAuthenticated()) {
      if (guestLink) guestLink.textContent = 'Dashboard'
      if (adminLink) adminLink.style.display = 'inline-block'
      if (authSection) authSection.style.display = 'none'
      if (userInfo) {
        userInfo.style.display = 'block'
        userInfo.innerHTML = `
          <span>Welcome, ${this.currentUser.email}</span>
          <button id="logout-btn" class="logout-btn">Logout</button>
        `
        document.getElementById('logout-btn')?.addEventListener('click', () => this.signOut())
      }
    } else {
      if (guestLink) guestLink.textContent = 'Guest'
      if (adminLink) adminLink.style.display = 'none'
      if (authSection) authSection.style.display = 'block'
      if (userInfo) userInfo.style.display = 'none'
    }
  }
}