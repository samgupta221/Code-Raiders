 const Item = require('../models/Item');
 const User = require('../models/User');
 const cloudinary = require('../config/cloudinary');
 exports.createItem = async (req, res) => {
  try {
    const { title, description, category, type, size, condition, brand, color, material, 
    
    // Calculate point value based on condition and category
    const pointValue = calculatePointValue(condition, category);
    
    const images = [];
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'rewear/items'
        });
        images.push({
          url: result.secure_url,
          publicId: result.public_id
        });
      }
    }
    const item = await Item.create({
      title,
      description,
      category,
      type,
      size,
      condition,
      brand,
      color,
      material,
      images,
      tags: tags ? JSON.parse(tags) : [],
      owner: req.user._id,
      pointValue
    });
    await item.populate('owner', 'name avatar');
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
 Item Controller (controllers/itemController.js)
      item
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating item'
    });
  }
 };
 exports.getItems = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      size, 
      condition, 
      search, 
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;
    const filter = { status: 'available', isActive: true };
    
    if (category) filter.category = category;
    if (size) filter.size = size;
    if (condition) filter.condition = condition;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    const items = await Item.find(filter)
      .populate('owner', 'name avatar location.city')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await Item.countDocuments(filter);
    res.json({
      success: true,
      items,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching items'
    });
  }
 };
 exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('owner', 'name avatar location ratings')
      .populate('swapRequests.user', 'name avatar')
      .populate('swapRequests.offeredItems', 'title images pointValue');
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    // Increment view count
    await Item.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.json({
      success: true,
      item
    });
  } catch (error) {
    console.error('Get item error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching item'
    });
  }
 };
 const calculatePointValue = (condition, category) => {
  const basePoints = {
    'tops': 20,
    'bottoms': 25,
    'dresses': 35,
    'outerwear': 50,
    'shoes': 30,
    'accessories': 15,
    'other': 20
  };
  const conditionMultiplier = {
    'like-new': 1.0,
    'very-good': 0.8,
    'good': 0.6,
    'fair': 0.4
};
 return Math.round(basePoints[category] * conditionMultiplier[condition]);
 };