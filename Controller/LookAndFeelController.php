<?php
class LookAndFeelController extends AppController
{

  public function beforeFilter()
  {
    $this->Auth->allow(array('css', 'refresh_caches', 'refresh_this_cache', 'file', 'map_img'));
    parent::beforeFilter();
    $this->Security->unlockedActions[] = 'admin_add';
    $this->Security->unlockedActions[] = 'admin_edit';
  }


  /**
   * Add look and feel form, and post processing.
   */

  
  private function _css($host)
  {
    // Try to find the cached CSS
    if ($host === 'fonts') {
      $compiled_css = Cache::read($this->LookAndFeel->getCssCacheKey($host, ' '));
    }
    else {
      $compiled_css = Cache::read($this->LookAndFeel->getCssCacheKey($host));
    }

    if (empty($compiled_css) or $compiled_css == false) {

      // If not in the cache then create the CSS
      $compiled_css = $this->LookAndFeel->compileLess($host);
    }

    return $compiled_css;
  }


  /**
   * Action to return the compiled css for the current host.
   * Will generate a compiled css from less files
   * if css not already cached.
   */

  public function css($file = null)
  {
    if (!isset($_SERVER['HTTP_HOST'])) {
      // Because bots and dumb terminals can not use css.
      $this->set(array('compiled_css' => ''));
      exit;
    }

    $this->response->type('text/css');
    $this->layout = 'empty';
    $host         = $_SERVER['HTTP_HOST'];

    if (!empty($file)) {
      // Try to find the file specific cached CSS
      $compiled_css = $this->_css($file);
    }
    else {
      // Try to find the cached CSS
      $compiled_css = $this->_css($host);
    }

    $this->set(compact('compiled_css'));
  }

}
 