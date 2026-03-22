import express from "express"
import { adminOnly }        from "../middlewares/adminOnly.js"
import { authCheck }        from "../middlewares/authCheck.js"
import { organizerOrAdmin } from "../middlewares/organizerOrAdmin.js"
import {
    createEvent, getEvents, getMyEvents, updateEvent, deleteEvent,
    registerForEvent, getMyQR, getMyRegisteredEvents, getRegistrationCount,
    getEventRegistrations,
    applyAsVolunteer, getMyVolunteerApplications, getVolunteerOpportunities,
    getEventVolunteerApplications, updateVolunteerStatus,
} from "../controllers/eventController.js"

const eventRouter = express.Router()

// ── IMPORTANT: ALL static-path routes must be defined BEFORE any /:param routes ──

// Public
eventRouter.get("/", getEvents)

// Organizer/Admin — create event
eventRouter.post("/", organizerOrAdmin, createEvent)

// Auth: personal data routes (static — must be before /:id)
eventRouter.get("/my/registrations",           authCheck, getMyRegisteredEvents)
eventRouter.get("/my/volunteer-applications",  authCheck, getMyVolunteerApplications)
eventRouter.get("/volunteer/opportunities",    authCheck, getVolunteerOpportunities)

// Organizer/Admin — my events (organizer sees own, admin sees all)
eventRouter.get("/my/events", organizerOrAdmin, getMyEvents)

// ── Dynamic /:id and nested routes below this line ──

// Organizer/Admin — event CRUD
eventRouter.put(   "/:id",    organizerOrAdmin, updateEvent)
eventRouter.delete("/:id",    organizerOrAdmin, deleteEvent)

// Organizer/Admin — per-event registrations & volunteer management
eventRouter.get(  "/:eventId/registrations",                          organizerOrAdmin, getEventRegistrations)
eventRouter.get(  "/:eventId/volunteer-applications",                 organizerOrAdmin, getEventVolunteerApplications)
eventRouter.patch("/:eventId/volunteer/:applicationId/status",        organizerOrAdmin, updateVolunteerStatus)

// Auth: per-event user actions
eventRouter.post("/:id/register",  authCheck, registerForEvent)
eventRouter.get( "/:id/my-qr",     authCheck, getMyQR)
eventRouter.post("/:id/volunteer", authCheck, applyAsVolunteer)

// Stats
eventRouter.get("/registrations/count/:userId", adminOnly, getRegistrationCount)

export default eventRouter
