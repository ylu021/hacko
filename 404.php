<?php include 'head.php'; ?>
    <div class="search container-pushin">
      <div class="search-bar">
        <input type="text" id="searchtext" placeholder="Type Something..." autocomplete="off" class="form-control search-bar-field"/>
        <input type="submit" id="search" value="Search" class="form-control search-bar-field-btn"/>
      </div>
    </div>
    <div id="searchresult" class="search-result">
        <div class="search-result-error">No videos founded</div>
    </div>
    <?php include 'script.php'; ?>
  </body>
</html>
