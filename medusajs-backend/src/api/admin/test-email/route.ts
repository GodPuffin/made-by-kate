import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import path from "path"
import fs from "fs"
import Handlebars from "handlebars"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const resendService = req.scope.resolve("resendService")
  const logger = req.scope.resolve("logger")
  
  try {
    logger.info("Testing email service...")
    
    // Test template compilation directly
    const basePath = process.cwd()
    const templatePath = path.join(basePath, "data", "templates", "password_reset")
    
    logger.info("Template paths:", {
      basePath,
      templatePath,
      exists: fs.existsSync(templatePath),
      files: fs.existsSync(templatePath) ? fs.readdirSync(templatePath) : []
    })

    // Read and compile templates directly
    const htmlTemplate = fs.readFileSync(path.join(templatePath, "html.hbs"), "utf8")
    const subjectTemplate = fs.readFileSync(path.join(templatePath, "subject.hbs"), "utf8")
    
    logger.info("Raw templates:", {
      html: htmlTemplate.substring(0, 200) + "...",
      subject: subjectTemplate
    })

    const compiledHtml = Handlebars.compile(htmlTemplate)
    const compiledSubject = Handlebars.compile(subjectTemplate)
    
    const testData = {
      customer: {
        first_name: "Test",
        last_name: "User",
        email: "mailingmarcuslee@gmail.com"
      },
      reset_link: "https://madebykate.ca/reset-password?token=test123",
      email: "mailingmarcuslee@gmail.com"
    }
    
    // Test template rendering
    const renderedHtml = compiledHtml(testData)
    const renderedSubject = compiledSubject(testData)
    
    // Try sending with the rendered templates directly
    const response = await resendService.transporter_.sendEmail({
      from: resendService.options_.from,
      to: testData.email,
      subject: renderedSubject.trim(),
      html: renderedHtml,
      text: renderedHtml.replace(/<[^>]*>/g, '')
    })
    
    res.json({ 
      success: true, 
      message: "Template test completed",
      templateTest: {
        rawTemplates: {
          html: htmlTemplate.substring(0, 200) + "...",
          subject: subjectTemplate
        },
        rendered: {
          subject: renderedSubject,
          htmlSnippet: renderedHtml.substring(0, 500) + "..."
        },
        data: testData,
        response
      },
      debug: {
        templatePath,
        files: fs.readdirSync(templatePath),
        serviceConfig: {
          templatePath: resendService.templatePath_,
          from: resendService.options_.from
        }
      }
    })
  } catch (error) {
    logger.error("Template test failed:", error)
    logger.error("Template paths:", {
      cwd: process.cwd(),
      templatePath: path.join(process.cwd(), "data", "templates", "password_reset"),
      exists: fs.existsSync(path.join(process.cwd(), "data", "templates", "password_reset")),
      files: fs.existsSync(path.join(process.cwd(), "data", "templates", "password_reset")) ? 
        fs.readdirSync(path.join(process.cwd(), "data", "templates", "password_reset")) : []
    })
    
    res.status(500).json({ 
      success: false, 
      message: "Template test failed",
      error: error.message,
      stack: error.stack,
      debug: {
        cwd: process.cwd(),
        templatePath: path.join(process.cwd(), "data", "templates", "password_reset"),
        exists: fs.existsSync(path.join(process.cwd(), "data", "templates", "password_reset")),
        files: fs.existsSync(path.join(process.cwd(), "data", "templates", "password_reset")) ? 
          fs.readdirSync(path.join(process.cwd(), "data", "templates", "password_reset")) : []
      }
    })
  }
} 