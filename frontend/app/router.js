import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route("signup");
  this.route("login");
  this.route("home");
  this.route("password-reset");
  this.route("course", function() {
    this.route("index", { path: "/:course_slug" });
    this.route("module", function() {
      this.route("index", { path: "/:module_slug" });
      this.route("lesson", function() {
        this.route("index", { path: "/:lesson_slug" });
        this.route("chapter", { path: "/chapter/:chapter_id" });
      });
      this.route("edit", { path: "/edit/:module_slug" });
    });
    this.route("create");
    this.route("edit", { path: "/edit/:course_slug" });
  });
  this.route("profile", { path: "/profile/:username" }, function() {
    this.route("settings");
  });
  this.route("search");
  this.route("about");
  this.route("cms", function() {
    this.route("lesson", function() {
      this.route("create");
      this.route("edit", { path: "/:lesson_id" });
    });
  });
  this.route("module", function() {
    this.route("create");
  });
  this.route('password-reset');
  this.route('reset');
});
