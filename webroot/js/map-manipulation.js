function headingToDirection(degree, speed) {
  if (parseFloat(degree) === 0.0 && parseFloat(speed) === 0.0) {
    return 8;
  }
  if (degree <= 360.0 && degree >= 0.0) {
    return (Math.round(Math.floor(degree / 4.5) / 10) % 8);
  }
  return 8;
}

var normalMapImages = ["/look_and_feel/map_img/000000-0-arrow.png",
                       "/look_and_feel/map_img/000000-45-arrow.png",
                       "/look_and_feel/map_img/000000-90-arrow.png",
                       "/look_and_feel/map_img/000000-135-arrow.png",
                       "/look_and_feel/map_img/000000-180-arrow.png",
                       "/look_and_feel/map_img/000000-225-arrow.png",
                       "/look_and_feel/map_img/000000-270-arrow.png",
                       "/look_and_feel/map_img/000000-315-arrow.png",
                       "/look_and_feel/map_img/000000-0-dot.png"];

var activeMapImages = ["/look_and_feel/map_img/000000-0-arrow.active.png",
                       "/look_and_feel/map_img/000000-45-arrow.active.png",
                       "/look_and_feel/map_img/000000-90-arrow.active.png",
                       "/look_and_feel/map_img/000000-135-arrow.active.png",
                       "/look_and_feel/map_img/000000-180-arrow.active.png",
                       "/look_and_feel/map_img/000000-225-arrow.active.png",
                       "/look_and_feel/map_img/000000-270-arrow.active.png",
                       "/look_and_feel/map_img/000000-315-arrow.active.png",
                       "/look_and_feel/map_img/000000-0-dot.active.png"];
