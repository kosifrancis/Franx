
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER USER
const registerUser = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            phoneNumber,
            role,
            companyName,
            companyDescription,
            companyLocation,
            professionalTitle,
            specialties,
            skills,
            experienceLevel,
            portfolioUrl,
            hourlyRate,
            bio
        } = req.body;

        // Check common required fields
        if (![fullName, email, password, phoneNumber, role].every((value) => typeof value === 'string' && value.trim())) {
            return res.status(400).json({
                message: 'Please provide all required fields'
            });
        }

        // Validate account type
        if (!['employer', 'freelancer'].includes(role)) {
            return res.status(400).json({
                message: 'Role must be employer or freelancer'
            });
        }

        // Validate password
        if (password.length < 8 || password.length > 72) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters'
            });
        }

        // Employer-specific validation
        if (role === 'employer' && !companyName) {
            return res.status(400).json({
                message: 'Company name is required for employers'
            });
        }

        // Freelancer-specific validation
        if (role === 'freelancer' && !professionalTitle) {
            return res.status(400).json({
                message: 'Professional title is required for freelancers'
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            return res.status(400).json({ message: 'Please provide a valid email address' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'Email is already registered'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({
            fullName,
            email: normalizedEmail,
            password: hashedPassword,
            phoneNumber,
            role,

            companyName,
            companyDescription,
            companyLocation,

            professionalTitle,
            specialties,
            skills,
            experienceLevel,
            portfolioUrl,
            hourlyRate,
            bio
        });

        return res.status(201).json({
            message: 'Account created successfully!',
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        if (error.code === 11000) return res.status(409).json({ message: 'Email is already registered' });
        console.error('Registration error:', error.message);

        return res.status(500).json({
            message: 'Registration failed',
        });
    }
};


// LOGIN USER
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured');

        const user = await User.findOne({
            email: normalizedEmail
        }).select('+password');

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign(
            {
                userId: user._id.toString(),
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            message: 'Login successful!',
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error.message);

        return res.status(500).json({
            message: 'Login failed',
        });
    }
};


module.exports = {
    registerUser,
    loginUser
};
