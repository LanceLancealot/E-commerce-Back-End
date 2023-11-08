const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'not found!' });
  }
});

router.get('/:id', async (req, res) => {
  try{
    const category = await Category.findByPk(req.params.id, { include: [{model: Product}]});
    if(!category){
      res.status(404).json({ message: 'ID could not be found!' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'not found!' });
  }
});

router.post('/', async (req, res) => {
  try{
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'creation failed!' });
}});

router.put('/:id', async (req, res) => {
  try{
    const updated = await Category.update(req.body, {where: {id: req.params.id}});
    res.status(200).json({message: ' Category updated!'});
  } catch (err) {
    res.status(500).json({message: 'update failed!'})
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      res.status(404).json({ message: 'ID not found' });
    } else {
      res.status(200).json({ message: 'Category deleted successfully', deleted });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;