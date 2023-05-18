/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import EmailProvider from '../../../_shared/providers/email-provider'
import { HttpResponse } from '../../../_shared/utils/helpers/http'
import { ok, serverError } from '../../../_shared/utils/helpers/http-helpers'
import nodeMailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export default class WellComeEmail implements EmailProvider {
  async sendEmail (email: string, name: string): Promise<HttpResponse> {
    interface transportOptions {
      host: string
    }

    try {
      const transporter: Mail = nodeMailer.createTransport({
        host: 'smtp.elasticemail.com',
        port: 2525,
        secure: false,
        auth: {
          user: 'fanuelramos111@gmail.com',
          pass: '5CA08191732B6D0DDA54AB8A204DACCB8B6C'
        }
      } as transportOptions)

      await transporter.sendMail({
        from: 'Uta-School <fanuelramos111@gmail.com>',
        to: email,
        subject: 'Bem vindo a Uta School',
        html: '<h3>Olá ' + name + ' </h3>' +
        '<p>Bem-vindo à Uta-School. Estamos felizes em vê-lo entre nossos Alunos.</p>' +
        '<p>A missão da Uta-School é tornar o ensino da programação mais fácil começando do ' +
          'mais básico e dessa forma direcionar melhor nossos alunos nessa incrível jornada até se ' +
          'tornar um Desenvolvedor de excelência, portanto temos certeza de que, com nosso Curso de ' +
          'Programação par Iniciante - Java, você pode adiquirá conhecimento básicos e imprecindíveis ' +
          'para se tornar um excelente Desenvolvedor.</p>' +
        '</p>As aulas terão início após o termino das aulas gratís que serão lecionadas na UGS, as Sextas-feiras ' +
          'as 13:00 </p>' +
        '<p>Se cuide!</p>' +
        '<p>Fanuel Ramos - Instrutor</p>'
      })
      return ok({
        name,
        email
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
