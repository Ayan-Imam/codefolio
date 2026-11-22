import mongoose from 'mongoose';

// Every template the app supports.
// When we add a new template, its id goes here AND in PortfolioRenderer's templateMap.
export const TEMPLATE_IDS = ['minimalist', 'cyberpunk'];

// ---------- Sub-schema: one project ----------
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Project title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Project description cannot exceed 1000 characters'],
    default: '',
  },
  imageUrl: { type: String, trim: true, default: '' },
  githubUrl: { type: String, trim: true, default: '' },
  liveUrl: { type: String, trim: true, default: '' },
});

// ---------- Sub-schema: one skill category ----------
const skillCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Skill category name is required'],
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters'],
  },
  items: [{ type: String, trim: true, maxlength: 50 }],
});

// ---------- Main schema: the user ----------
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
      match: [
        /^[a-z0-9_-]+$/,
        'Username can only contain letters, numbers, underscores and hyphens',
      ],
    },

    profile: {
      fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        maxlength: [80, 'Full name cannot exceed 80 characters'],
      },
      headline: { type: String, trim: true, maxlength: 120, default: '' },
      bio: { type: String, trim: true, maxlength: 1000, default: '' },
      location: { type: String, trim: true, maxlength: 80, default: '' },
      email: { type: String, trim: true, lowercase: true, default: '' },
      resumeUrl: { type: String, trim: true, default: '' },
      socialLinks: {
        github: { type: String, trim: true, default: '' },
        linkedin: { type: String, trim: true, default: '' },
        twitter: { type: String, trim: true, default: '' },
        website: { type: String, trim: true, default: '' },
      },
    },

    projects: [projectSchema],
    skills: [skillCategorySchema],

    // Which layout renders this user's portfolio
    templateId: {
      type: String,
      enum: {
        values: TEMPLATE_IDS,
        message: '{VALUE} is not a supported template',
      },
      default: 'minimalist',
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

const User = mongoose.model('User', userSchema);

export default User;