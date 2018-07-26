using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ModemMocker
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        SerialPort port;

        private void bOpenCOM_Click(object sender, EventArgs e)
        {
            try
            {
                if (port == null)
                {
                    port = new SerialPort(textBoxCOMPort.Text, 9600, Parity.None, 8, StopBits.One);
                    port.Open();
                    bOpenCOM.Text = "Close";
                    textBoxCOMPort.Enabled = false;
                    groupBoxMain.Enabled = true;
                    BeginReading();
                }
                else
                {
                    port.Close();
                    port.Dispose();
                    port = null;
                    bOpenCOM.Text = "Open";
                    textBoxCOMPort.Enabled = true;
                    groupBoxMain.Enabled = false;
                    EndReading();
                }

                
            }
            catch(Exception ex)
            {
                MessageBox.Show(ex.ToString(), "Error");

                if (port != null)
                {
                    bOpenCOM.Text = "Close";
                    textBoxCOMPort.Enabled = false;
                    groupBoxMain.Enabled = true;
                }
                else
                {
                    bOpenCOM.Text = "Open";
                    textBoxCOMPort.Enabled = true;
                    groupBoxMain.Enabled = false;
                }
            }
        }

        Thread readerThread;



        private void BeginReading()
        {
            readerThread = new Thread(new ThreadStart(ReadPort));
            readerThread.Start();
        }

        private void EndReading()
        {
            readerThread.Abort();
            readerThread = null;
        }

        private void ReadPort()
        {
            
            while (true)
            {
                try
                {
                    if (port != null && port.IsOpen && port.BytesToRead > 0)
                    {
                        textBoxRecievedData.Invoke(
                            (Action)delegate ()
                            {
                                textBoxRecievedData.Text += (port.ReadByte().ToString() + Environment.NewLine);
                            });
                    }
                }
                catch (Exception ex)
                {
                }
            }
        }

        private void buttonSend_Click(object sender, EventArgs e)
        {
            labelError.Text = "";
            string[] split = textBoxSendData.Text.Split(' ');

            if (textBoxSendData.Text.Length == 0)
            {
                split = new string[0];
            }
            else if (split.Length % 3 != 0)
            {
                labelError.Text = "Total amount of numbers not dividable by three!";
                return;
            }

            if(split.Length > 255)
            {
                labelError.Text = "Total amount of numbers cannot be more than 255";
                return;
            }

            byte[] bytes = new byte[split.Length + 11];

            bytes[0] = 255; //Start marker
            bytes[1] = 255; //Start marker
            bytes[2] = 255; //Start marker
            bytes[3] = 0; // SASP Version
            bytes[4] = 0; // SASP Version
            bytes[5] = 0; // length
            bytes[6] = (byte)split.Length; // length
            bytes[bytes.Length - 2] = 0b11111110; // end marker
            bytes[bytes.Length - 3] = 255; // end marker
            bytes[bytes.Length - 4] = 255; // end marker
            bytes[bytes.Length - 1] = 255; // validator

            for (int i = 7; i < split.Length + 7; i++)
            {
                if (byte.TryParse(split[i - 7], out byte b))
                {
                    bytes[i] = b;
                }
                else
                {
                    labelError.Text = $"Cannot parse \"{split[i]}\" into an byte";
                    return;
                }
            }

            MessageBox.Show(string.Join(", ", bytes));

            //port.Write(bytes, 0, bytes.Length);

            foreach (byte b in bytes)
            {
                port.Write(new byte[] { b }, 0, 1);
                Thread.Sleep(100);
            }

            textBoxSendData.Text = "";
        }
    }
}
